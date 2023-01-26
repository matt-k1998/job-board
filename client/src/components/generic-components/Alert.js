import classes from './Alert.module.css'

export default function Alert({ text }) {

  return (
        <div className={classes.alertContainer}>
                <div className={classes.alertInner}>{text}</div>
        </div>
    );
  }