import EditIcon from '@mui/icons-material/Edit';
import classes from './ProfileSettings.module.css'

function ProfileSettings() {
    // function getInitialState() {
    //     return (<a> press me </a>);
    // }

    function editItem() {
        return (<div> one div </div>);
    }

    return (
        <div>
            <h1 className="title">
                Profile Settings
            </h1>
            <div className="box">
                <form>
                    <div className={classes.field}>
                        <label onClick={editItem} className={classes.label}>
                            Edit Name
                        </label>
                        <button className={classes.control}>
                            <EditIcon onClick={editItem}/>
                        </button>
                    </div>
                    <div className={classes.field}>
                        <label className={classes.label}>
                            Edit Email
                        </label>
                        <button className={classes.control}>
                            <EditIcon/>
                        </button>
                    </div>
                    <div className={classes.field}>
                        <label className={classes.label}>
                            Edit Password
                        </label>
                        <button className={classes.control}>
                            <EditIcon/>
                        </button>
                    </div>
                    <div className={classes.field}>
                        <label className={classes.label}>
                            Edit Company
                        </label>
                        <button className={classes.control}>
                            <EditIcon/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default ProfileSettings;