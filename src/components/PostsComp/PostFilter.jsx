import React from "react";
import MySelect from '../Ui/select/MySelect'
import MyInput from '../Ui/input/MyInput'

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput style={{ padding: '7px 10px', width: '380px' }} onChange={e => setFilter({ ...filter, query: e.target.value })} value={filter.query} placeholder='Пошук...' />
      <h2 style={{ marginBottom: 3 }}>Сортування</h2>
      <MySelect
        value={filter.sort}
        onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
        options={[{ value: '', name: 'За датою' }, { value: 'title', name: 'За назвою' }, { value: 'body', name: 'За описом' }]} />
    </div>
  )
}

export default PostFilter;