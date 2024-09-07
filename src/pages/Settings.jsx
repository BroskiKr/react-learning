import React, { useContext, useState } from "react";
import '../styles/Settings.css'
import MySelect from "../components/Ui/select/MySelect";
import PostService from "../API/PostService";
import { AuthContext } from "../context";

const Settings = (props) => {
  const [topic, setTopic] = useState()

  const [buttonIsDisable, setButtonIsDisable] = useState(false)

  const { token } = useContext(AuthContext)

  const createDailyPostsGeneratingTask = async () => {
    const response = await PostService.dailyGeneratingPosts(topic, token)
    if (response.status === 202) {
      setButtonIsDisable(true)
    }
  }

  return (
    <div className="settings">
      <h1 >Налаштування</h1>
      <div className="feature">
        <span style={{ marginRight: 8 }}>Автоматично генерувати пости кожен день:</span>
        <MySelect
          value={topic}
          onChange={(value) => setTopic(value)}
          options={[
            { value: null, name: 'Не генерувати' },
            { value: 'books', name: 'Про книги' },
            { value: 'devices', name: 'Про девайси' },
          ]} />
      </div>
      <button onClick={() => createDailyPostsGeneratingTask()} className="settings-button" disabled={buttonIsDisable}>Застосувати зміни</button>
    </div>

  );
}

export default Settings;