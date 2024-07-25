import bg from "../../images/error.png"

const NotFound = () => {
  return (
    <div style={{'--image-url': `url(${bg})`}}
         className="w-screen h-screen bg-[image:var(--image-url)] bg-center bg-no-repeat bg-scroll overflow-x-hidden overflow-y-hidden">
    </div>
  )
}
export default NotFound
