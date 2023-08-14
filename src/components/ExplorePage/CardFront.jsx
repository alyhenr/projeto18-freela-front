import PropTypes from "prop-types";

const CardFront = ({
  name, description, price, duration, categories, categoriesMap, setClicked, isClient, isProvider
}) => {
  return (
    <div onClick={() => setClicked()} className="initial">
      {isClient ? <h2 className="active-contract">
        You have an active contract with this samurai!</h2>
        : isProvider ? <h2 className="active-contract">
          You&apos;re the one providing this awesome service!</h2> : <></>}
      <img src="src/assets/landing.jpg" alt="" />
      <h2>SAMURAI: {name}</h2>
      <p>Price per day: <strong>${price / 100}</strong></p>
      <p>Avarage duration: <strong>
        {duration} {duration > 1 ? "days" : "day"}
      </strong></p>
      <p><strong>Details:</strong> {description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, quidem! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi fugit odio tenetur consectetur quos quis, laboriosam temporibus. Voluptatibus, iste tenetur!</p>
      <div>
        <button>SEE MORE DETAILS</button>
        <strong>
          <p>{categories.map(categoryId => categoriesMap[categoryId]).join(" - ")}</p>
        </strong>
      </div>
    </div>
  )
};

CardFront.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  duration: PropTypes.number,
  categories: PropTypes.array,
  categoriesMap: PropTypes.object,
  setClicked: PropTypes.func,
  isProvider: PropTypes.bool,
  isClient: PropTypes.bool,
};

export default CardFront;