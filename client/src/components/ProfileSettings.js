import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import classes from './ProfileSettings.module.css'
import { getUser } from '../auth';
import {
    useUser,
    useUpdateUserName,
    useUpdateUserEmail,
    useUpdateUserPassword,
    useUpdateUserCompany
} from '../graphql/hooks';
import Dropdown from 'react-bootstrap/Dropdown';

function ProfileSettings() {
    const [currentUser] = useState(getUser);
    const [visibleItem, setVisibleItem] = useState();
    const { user } = useUser(currentUser.id);
    const [name, setName] = useState(!user ? '' : user.name);
    const [email, setEmail] = useState(!user ? '' : user.email);
    const [password, setPassword] = useState(!user ? '' : user.password);
    const [companyName, setCompanyName] = useState(!user ? '' : user.company.name);
    const [companies] = useState(!user ? '' : user.companies);

    let resCompanies = [];
    let resCompaniesObj = {};
    Object.values(companies).forEach(element => {
        resCompanies.push(element.name);
        resCompaniesObj[element.name] = element.id;
    });

    var selectedCompanyId;
    if (resCompaniesObj.hasOwnProperty(companyName)) {
        selectedCompanyId = resCompaniesObj[companyName];
    }

    const { updateUserName } = useUpdateUserName();
    const { updateUserEmail } = useUpdateUserEmail();
    const { updateUserPassword } = useUpdateUserPassword();
    const { updateUserCompany } = useUpdateUserCompany();

    const handleUserNameChange = async (event) => {
        event.preventDefault();
        await updateUserName(user.id, name, user.email, user.password, user.companyId);
    }

    const handleUserEmailChange = async (event) => {
        event.preventDefault();
        await updateUserEmail(user.id, name, email, user.password, user.companyId);
    }

    const handleUserPasswordChange = async (event) => {
        event.preventDefault();
        await updateUserPassword(user.id, name, user.email, password, user.companyId);
    }

    const handleUserCompanyChange = async (event) => {
        event.preventDefault();
        await updateUserCompany(user.id, name, user.email, user.password, selectedCompanyId);
    }

    const handleCancelPress = (event) => {
        event.preventDefault();
        setVisibleItem();
    }

    const handleSelect = (eventKey, event) => {
        event.persist();
        setCompanyName(eventKey);
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
                                    <CancelIcon onClick={handleCancelPress}/>
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className={classes.confirmCancel}>
                                <CheckIcon onClick={handleUserEmailChange}/>
                            </button>
                            <button className={classes.confirmCancel}>
                                <CancelIcon onClick={handleCancelPress}/>
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
                                onChange={(e) => setPassword(e.target.value)}
                                onClick={(e) =>  e.preventDefault()}
                            />
                            <button className={classes.confirmCancel}>
                                <CheckIcon onClick={handleUserPasswordChange}/>
                            </button>
                            <button className={classes.confirmCancel}>
                                <CancelIcon onClick={handleCancelPress}/>
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
                            <Dropdown className={classes.editInput} onSelect={handleSelect}>
                                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                    Select Company
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                    {
                                        resCompanies.map(cName => {
                                            return <Dropdown.Item eventKey={cName} key={cName}>{cName}</Dropdown.Item>
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <button className={classes.confirmCancel}>
                                <CheckIcon onClick={handleUserCompanyChange}/>
                            </button>
                            <button className={classes.confirmCancel}>
                                <CancelIcon onClick={handleCancelPress}/>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}


export default ProfileSettings;