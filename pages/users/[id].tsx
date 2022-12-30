import Footer from "../../components/Footer/Footer";
import HeadComponent from "../../components/Head/HeadComponent";
import NavBar from "../../components/NavBar/NavBar";
import { userType } from "../users";
import style from './../../styles/user.module.scss'

const User = ({ user }: { user: userType }) => {
  return (<div className={style.userContainer}>
    <HeadComponent description='test project, user id link'
      viewport='width=device-width, initial-scale=1'
    />
    <NavBar />
    <div className={style.wrapperContainer}>
      <img src="https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png" alt="avatarImage" />
      <span>Name:{user.name} </span>
      <span>email:{user.email} </span>
      <span>city:{user.address.city} </span>
      <span>phone:{user.phone} </span>
      <span>website:{user.website} </span>

    </div>
    <Footer />
  </div>);
};

export default User;


export async function getServerSideProps({ params }: { params: { id: number } }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
  const user = await response.json()
  return {
    props: { user },
  }
}