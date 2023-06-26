import classes from './evidence-grid.module.css'

function ClaimContent(props) {
  return(

<div>
<div>
    <img src={props.image} alt={props.title} />
</div>
  <div>

      <h1 className={classes.claimtitle}>{props.claimtitle}</h1>

      <p className={classes.claimdescriptionp}>{props.claimdescription}</p>
  </div>
  </div>
)};

export default ClaimContent;
