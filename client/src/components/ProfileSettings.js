import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import classes from './ProfileSettings.module.css'
import { getUser } from '../auth';
import { useUser, useUpdateUserName } from '../graphql/hooks';

function ProfileSettings() {
    const [currentUser, setUser] = useState(getUser);
    const [visibleItem, setVisibleItem] = useState('');
    const { user } = useUser(currentUser.id);

    console.log(user);

    const [name, setName] = useState(!user ? '' : user.name);
    const [email, setEmail] = useState(!user ? '' : user.email);
    const [password, setPassword] = useState(!user ? '' : user.password);
    const { updateUserName, loading, error } = useUpdateUserName();

    const handleUserNameChange = async (event) => {
        event.preventDefault();
        await updateUserName(user.id, name, user.email, user.password);
    }

    return (
        <div>
            <h1 className="title">
                Profile Settings
            </h1>
            <div className="box">
                <div className={classes.field}>
                    <label className={classes.label}>
                        Edit Name
                    </label>
                    <button className={classes.control}>
                        <EditIcon onClick={(e) => {
                            e.preventDefault();
                            setVisibleItem("editName");
                        }}/>
                    </button>
                    {
                        visibleItem === "editName" &&
                        <div>
                            <form className={classes.field}>
                                <input type="text" className={classes.editInput}
                                    defaultValue={name}
                                    onClick={(e) =>  e.preventDefault()}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button className={classes.confirmCancel}>
                                    <CheckIcon onClick={handleUserNameChange}/>
                                </button>
                                <button className={classes.confirmCancel}>
                                    <CancelIcon onClick={(e) => e.preventDefault()}/>
                                </button>
                            </form>
                        </div>
                    }
                </div>
                <div className={classes.field}>
                    <label className={classes.label}>
                        Edit Email
                    </label>
                    <button className={classes.control}>
                        <EditIcon onClick={(e) => {
                            e.preventDefault();
                            setVisibleItem("editEmail");
                        }}/>
                    </button>
                    {
                        visibleItem === "editEmail" &&
                        <div className={classes.field}>
                            <input type="text" className={classes.editInput}
                                defaultValue={email}
                                onClick={(e) =>  e.preventDefault()}
                            />
                            <button className={classes.confirmCancel}>
                                <CheckIcon onClick={(e) => e.preventDefault()}/>
                            </button>
                            <button className={classes.confirmCancel}>
                                <CancelIcon onClick={(e) => e.preventDefault()}/>
                            </button>
                        </div>
                    }
                </div>
                <div className={classes.field}>
                    <label className={classes.label}>
                        Edit Password
                    </label>
                    <button className={classes.control}>
                        <EditIcon onClick={(e) => {
                            e.preventDefault();
                            setVisibleItem("editPassword");
                        }}/>
                    </button>
                    {
                        visibleItem === "editPassword" &&
                        <div className={classes.field}>
                            <input type="text" className={classes.editInput}
                                defaultValue={password}
                                onClick={(e) =>  e.preventDefault()}
                            />
                            <button className={classes.confirmCancel}>
                                <CheckIcon onClick={(e) => e.preventDefault()}/>
                            </button>
                            <button className={classes.confirmCancel}>
                                <CancelIcon onClick={(e) => e.preventDefault()}/>
                            </button>
                        </div>
                    }
                </div>
                <div className={classes.field}>
                    <label className={classes.label}>
                        Edit Company
                    </label>
                    <button className={classes.control}>
                        <EditIcon onClick={(e) => {
                            e.preventDefault();
                            setVisibleItem("editCompany");
                        }}/>
                    </button>
                    {
                        visibleItem === "editCompany" &&
                        <div className={classes.field}>
                            <input type="text" className={classes.editInput}
                                onClick={(e) =>  e.preventDefault()}
                            />
                            <button className={classes.confirmCancel}>
                                <CheckIcon onClick={(e) => e.preventDefault()}/>
                            </button>
                            <button className={classes.confirmCancel}>
                                <CancelIcon onClick={(e) => e.preventDefault()}/>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}


export default ProfileSettings;