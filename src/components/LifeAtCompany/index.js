import './index.css'

const LifeAtCompany = props => {
  const {lifeAtCompany} = props
  //   console.log(lifeAtCompany)

  const convertSnakeToCamel = args => ({
    description: args.description,
    imageUrl: args.image_url,
  })

  const lifeAtCompanyCamel = convertSnakeToCamel(lifeAtCompany)
  //   console.log(lifeAtCompanyCamel)
  const {description, imageUrl} = lifeAtCompanyCamel

  return (
    <div className="life-at-company-object-container">
      <p>{description}</p>
      <img src={imageUrl} alt="life at company" />{' '}
    </div>
  )
}

export default LifeAtCompany
