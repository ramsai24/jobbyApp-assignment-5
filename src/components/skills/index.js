import './index.css'

const Skills = props => {
  const {skills} = props
  //   console.log(skills)
  const newSkillsList = skills.map(each => ({
    name: each.name,
    imageUrl: each.image_url,
  }))

  return (
    <div>
      <h1>Skills</h1>
      <ul className="job-item-details-skills-container">
        {newSkillsList.map(eachSkill => (
          <li className="each-skill" key={eachSkill.name}>
            <img src={eachSkill.imageUrl} alt={eachSkill.name} />
            <p>{eachSkill.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Skills
