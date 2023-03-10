import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import classes from './ProfileSettings.module.css'
import { getUser } from '../auth';
import { useUser, useUpdateUser } from '../graphql/hooks';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from './generic-components/Alert';

function ProfileSettings() {
    const [signedInUser] = useState(getUser);
    const [visibleItem, setVisibleItem] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { user, loading } = useUser(signedInUser.id);
    const [loadedUser, setLoadedUser] = useState();
    const [companies, setCompanies] = useState(!user ? '' : user.companies);
    const [dropdownTitle, setDropdownTitle] = useState(!user ? '' : user.company.name);
    const [name, setName] = useState(!user ? '' : user.name);
    const [email, setEmail] = useState(!user ? '' : user.email);
    const [password, setPassword] = useState(!user ? '' : user.password);
    const [companyName, setCompanyName] = useState(!user ? '' : user.company.name);

    useEffect(() => {
        setIsLoading(true);
        if(!loading && user) {
            setLoadedUser(user);
            setCompanies(user.companies);
            setDropdownTitle(user.company.name);
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
            setCompanyName(user.company.name);
        }
        setIsLoading(false);
    }, [loading, user]);

    const [isAlertVisible, setIsAlertVisible ] = useState(false);
    const [alertTitle, setAlertTitle ] = useState('');

    let resCompanies = [];
    let resCompaniesObj = {};
    Object.values(companies).forEach(element => {
        resCompanies.push(element.name);
        resCompaniesObj[element.name] = element.id;
    });

    var selectedCompanyId;
    var selectedCompanyName;
    if (resCompaniesObj.hasOwnProperty(companyName)) {
        selectedCompanyId = resCompaniesObj[companyName];
        selectedCompanyName = resCompanies.filter(r => r === companyName);
    }

    const { updateUser } = useUpdateUser();

    if (isLoading) {
        return <p>Loading...</p>
    }

    const setUpAlert = (title) => {
        setIsAlertVisible(true);
        setAlertTitle(title);
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 2000);
    }

    async function handleUserUpdate(event, text) {
        event.preventDefault();
        await updateUser(user.id, name, email, password, user.companyId);
        setUpAlert(text);
        setVisibleItem();
    }

    async function handleUserCompanyChange(event, text) {
        event.preventDefault();
        await updateUser(user.id, name, email, password, selectedCompanyId);
        setUpAlert(text);
        setVisibleItem();
    }

    const handleCancelPress = (event) => {
        event.preventDefault();
        setVisibleItem();
    }

    const handleSelect = (eventKey, event) => {
        event.persist();
        setCompanyName(eventKey);
        setDropdownTitle(selectedCompanyName);
    }

    return (
        <div>
            {
                isAlertVisible && <Alert key={user.id} text={alertTitle} />
            }
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
                        <div className={classes.field}>
                            <input type="text" className={classes.editInput}
                                defaultValue={loadedUser.name}
                                onClick={(e) =>  e.preventDefault()}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button className={classes.confirmCancel}>
                                <CheckIcon onClick={(e) => handleUserUpdate(e,'Name Updated')}/>
                            </button>
                            <button className={classes.confirmCancel}>
                                <CancelIcon onClick={handleCancelPress}/>
                            </button>
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
                                defaultValue={loadedUser.email}
                                onClick={(e) =>  e.preventDefault()}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className={classes.confirmCancel}>
                                <CheckIcon onClick={(e) => handleUserUpdate(e,'Email Updated')}/>
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
                                defaultValue={loadedUser.password}
                                onChange={(e) => setPassword(e.target.value)}
                                onClick={(e) =>  e.preventDefault()}
                            />
                            <button className={classes.confirmCancel}>
                                <CheckIcon onClick={(e) => handleUserUpdate(e,'Password Updated')}/>
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
                                    {dropdownTitle}
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
                                <CheckIcon onClick={(e) => handleUserCompanyChange(e,'Company Updated')}/>
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