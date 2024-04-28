import { TransitionGroup, CSSTransition } from "react-transition-group";
import UserItem from "./UserItem"


const UserList = ({ users, title, remove }) => {
  if (!users.length) {
    return (
      <h1 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '700' }}>Користувачі не знайдені</h1>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }} className='title'>{title}</h1>
      <TransitionGroup>
        {users.map((user, index) =>
          <CSSTransition
            key={user.id}
            timeout={500}
            classNames="post"
          >
            <UserItem remove={remove} user={user} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  )
}

export default UserList;