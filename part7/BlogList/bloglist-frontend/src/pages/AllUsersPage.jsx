import UserList from "../components/UserList";

const UserPage = ({ users }) => {
  return (
    <div>
      <UserList users={users} />
    </div>
  );
};

export default UserPage;
