import Footer from "../components/Footer/Footer";
import HeadComponent from "../components/Head/HeadComponent";
import NavBar from "../components/NavBar/NavBar"
import style from './../styles/users.module.scss'

export type userType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string,
        };
    },
    phone: string,
    website: string,

}
const Users = ({ users }: { users: userType[] }) => {
    return <div className={style.userContainer}>
        <HeadComponent description='test project, users link'
            viewport='width=device-width, initial-scale=1'
        />
        <NavBar />
        <div className={style.wrapperContainer}>
            <h1>Users</h1>
            <div className={style.wrapperContainerUsers}>
                {users.map((user) => <div
                    className={style.user}
                    key={user.address.zipcode}>
                    <a href={`users/${user.id}`}>
                        <span>Name: {user.name}</span>
                        <span>Sity: {user.address.city}</span>
                        <span>Email: {user.email}</span>
                    </a>
                </div>)}</div>
        </div>
        <Footer />
    </div>
}

export default Users

export async function getStaticProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    return {
        props: { users },
    }
}