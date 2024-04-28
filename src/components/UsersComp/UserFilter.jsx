import React from "react";
import MySelect from '../Ui/select/MySelect'
import MyInput from '../Ui/input/MyInput'

const UserFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput onChange={e => setFilter({ ...filter, query: e.target.value })} value={filter.query} placeholder='Пошук...' />
      <MySelect
        value={filter.sort}
        onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
        defaultValue='Сортування'
        options={[{ value: 'first_name', name: 'За іменем' }, { value: 'last_name', name: 'За прізвищем' }]} />
    </div>
  )
}

export default UserFilter;