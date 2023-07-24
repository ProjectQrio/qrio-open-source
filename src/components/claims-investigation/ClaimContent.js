import classes from './evidence-grid.module.css'

const CLAIM_DATA = [
    {
        id: 'claim1',
        title: 'It’s possible to increase peoples’ information literacy, or in other words, increase the discernment of individuals to think critically about the media and information they come across.',
        image: 'collectiveintelligence1.jpeg',
        description: '',
    },

    {
        id: 'claim2',
        title: 'Sudden deaths for younger age ranges in Western Countries have been increasing significantly since 2020 or 2021.',
        image: 'collectiveintelligence1.jpeg',
        description: '',
    },

    {
        id: 'claim3',
        title: 'Single parent homes with a father have similar outcomes to two parent homes, while single parent homes with a mother have much worse outcomes, on average.',
        image: 'collectiveintelligence1.jpeg',
        description: '',
    },

    {
        id: 'claim4',
        title: 'American tap water is generally safe to drink (except in specific, outlier cases where the system failed to function as intended).',
        image: 'collectiveintelligence1.jpeg',
        description: '',
    }
];

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
