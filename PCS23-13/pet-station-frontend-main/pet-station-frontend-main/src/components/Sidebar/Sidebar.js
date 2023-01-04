// importing components
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAlignLeft } from 'react-icons/fa';
import { Drawer, Button, Divider } from "@mui/material";
import { HiOutlineUser, HiOutlineHome, HiOutlineMail, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";
import UserAvatar from '../UserAvatar/UserAvatar';
import Banner from "../Banner/Banner";

// importing utility function
import { titleCase } from '../../utilities/helper';

// sidebar component
export default function Sidebar(props) {
    // props
    const { user, authCtx, option, setOption } = props;
    const navigator = useNavigate();    // page navigator

    // state to open or close sidebar
    const [open, setOpen] = useState(false);

    // function to handle logout
    const handleLogout = () => {
        authCtx.logout();   // logout user
        navigator('/', { replace: true });
    }

    // function to handle board selection
    const handleBoardSelection = (value) => {
        setOption(value);   // set option
        setOpen(false);
    }

    // options
    const boardOptions = [{
        id: 1,
        icon: <HiOutlineUser className="h-6 w-6 mr-5" />,
        label: 'profile'
    },
    {
        id: 2,
        icon: <HiOutlineHome className="h-6 w-6 mr-5" />,
        label: 'adoption'
    },
    {
        id: 3,
        icon: <HiOutlineMail className="h-6 w-6 mr-5" />,
        label: 'messages'
    },
    {
        id: 4,
        icon: <HiOutlineCog className="h-6 w-6 mr-5" />,
        label: 'settings'
    }];

    return (
        <div className='sidebar'>
            <div className="p-5">
                <Button color="inherit" onClick={() => { setOpen(!open) }}>
                    <FaAlignLeft
                        className="h-6 w-6"
                    />
                </Button>
            </div>

            <Drawer
                anchor='left'
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <div className='sidebar p-5'>
                    {/* banner */}
                    <div className='sidebar-banner mb-5'>
                        <Banner />
                    </div>

                    {/* user information */}
                    <div className='sidebar-header flex items-center'>
                        <div className='sidebar-header-avatar'>
                            <UserAvatar
                                profilePictureUrl={user.profilePictureUrl}
                                name={user.firstName}
                            />
                        </div>

                        <div className='sidebar-header-content mx-5'>
                            <div className='sidebar-header-content-username font-semibold'>
                                {
                                    `${titleCase(user.firstName)} ${titleCase(user.lastName)}`
                                }
                            </div>

                            <div className='sidebar-header-content-email font-lighter text-sm'>
                                {
                                    user.email
                                }
                            </div>
                        </div>
                    </div>

                    <div className="my-3">
                        <Divider />
                    </div>

                    {/* sidebar options */}
                    <div className="sidebar-options">
                        {
                            boardOptions.map(board => (
                                <div key={board.label} className={`${option === board.label ? 'bg-blue-100 rounded-md' : null} hover:bg-blue-100 hover:rounded-md p-2 my-5`}>
                                    <button
                                        onClick={() => { handleBoardSelection(board.label); }}
                                        className="sidebar-options-option flex items-center justify-center"
                                        type="button"
                                    >
                                        <div className="sidebar-options-option-image">
                                            {
                                                board.icon
                                            }
                                        </div>

                                        <div className="sidebar-options-option-label text-lg">
                                            {
                                                titleCase(board.label)
                                            }
                                        </div>
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                    <div className="my-3">
                        <Divider />
                    </div>

                    <div className="sidebar-logout flex mx-3 my-20">
                        <button className="flex items-center justify-center" onClick={handleLogout} type="button">
                            <div className="sidebar-logout-icon">
                                <HiOutlineLogout className="w-6 h-6 mr-5" />
                            </div>

                            <div className="sidebar-logout-label text-lg">
                                Logout
                            </div>
                        </button>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}