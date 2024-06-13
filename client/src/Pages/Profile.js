import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }
  
  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function Profile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState([])
    // const [posts, setPosts] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async () => {
        const response = await axios.get('/api/profile/' + id)
        setInfo(response.data)
    }



    if (info) {

        console.log(typeof (info.threads))
        console.log(typeof (info.posts))
    }

    const formatting = (text) => {
        const bold = /\*\*(.*?)\*\*/g
        const italic = /\*(.*?)\*/g
        const underline = /\_\_(.*?)\_\_/g;

        text = text.replace(bold, (match, str) => `<b>${str}</b>`)
        text = text.replace(italic, (match, str) => `<i>${str}</i>`)
        text = text.replace(underline, (match, str) => `<u>${str}</u>`)
        
        return text
    }   

    const firstIndex = (content, language) => {
        let whitespace= new Set([" ", "\t", "\n"])
        for(let i = 3+language.length; i< content.length; i++){
            if(!whitespace.has(content[i])){
                return i
            }
        }
    }

    const primaryContent = (post) => {
        const regex = /\$/;
        if((post.content).substring(0, 3) === "```"){
            const language = (post.content).substring(3,(post.content).indexOf('\n'))
            return (
                <SyntaxHighlighter language={language} style={atomDark} wrapLines showLineNumbers>
                    {(post.content).substring(firstIndex((post.content), language))}
                </SyntaxHighlighter>
            );
        } else if(regex.test(post.content)) {
            return (
                <Latex>
                    {post.content}
                </Latex>
            );
        } else {
            return (
                <div dangerouslySetInnerHTML={ { __html : formatting(post.content)}} />
            );
        }
    }

    return (

        <div style={{ padding: "2rem" }}>
            <h1>{user.name}</h1>
            <br />
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    >
                    <LinkTab label="Your Threads" href="/yourthreads" {...a11yProps(0)} />
                    <LinkTab label="Your Replies" href="/yourreplies" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <div>
                    {(info.threads && info.posts) ?
                        (
                            <div>
                                <List>
                                    {info.threads.map((thread, index) => (
                                        <ListItem key={index} button onClick={() => navigate(`/thread/${thread._id}`)}>
                                            <ListItemText primary={
                                                <span style={{ fontSize: "1.1rem" }}>
                                                    {primaryContent(thread)}
                                                </span>
                                            }
                                                secondary={
                                                    <div>
                                                        <div>Last Modified By: {thread.name}</div>
                                                        <div>Last Modified At: {new Date(thread.createdAt).toLocaleString()}</div>
                                                    </div>
                                                } />
                                        </ListItem>
                                    ))}
                                </List>
                                <br />
                            </div>

                        )
                        :
                        (
                            <div>
                                <h3>Loading...</h3>
                            </div>
                        )
                    }

                </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <div>
                    {(info.threads && info.posts) ?
                        (
                            <div>
                                <br />
                                <h1>Your Replies</h1>
                                <List>
                                    {info.posts.map((post, index) => (
                                        <div>
                                            <ListItem key={index}>
                                                <ListItemText primary={
                                                    <div style={{fontSize: "1.05rem"}}>
                                                        {primaryContent(post)}
                                                    </div>
                                                    }
                                                    secondary={
                                                        <div>
                                                            <div>By {post.name}</div>
                                                            <div>Posted at: {post.createdAt}</div>
                                                        </div>
                                                    } />
                                            </ListItem>
                                        </div>
                                    ))}
                                </List>
                            </div>

                        )
                        :
                        (
                            <div>
                                <h3>Loading...</h3>
                            </div>
                        )
                    }

                </div>
                </TabPanel>
            </div>
        </div>


    )
}