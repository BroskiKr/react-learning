import MyButton from "../Ui/button/MyButton";

const UserItem = ({ user, remove, index }) => {
  return (
    <div className="post">
      <div className="post__content">
        <strong >{index + 1}. {user.first_name} {user.last_name}</strong>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => remove(user)}>Delete</MyButton>
      </div>
    </div>
  )
}

export default UserItem;