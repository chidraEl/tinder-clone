const ListUsers = ({ matchedUsers, handleChatListClick, clickedUser }) => {
  return (
    <>
      {matchedUsers ? (
        <div className="overflow-x-hidden overflow-y-auto h-[73vh]">
          {matchedUsers?.map((user) => (
            <div
              className={
                clickedUser?.user_id === user.user_id
                  ? "chat-list-user active"
                  : "chat-list-user"
              }
              key={user.user_id}
              onClick={() => handleChatListClick(user)}
            >
              <div className="w-12">
                <img
                  src={user.url1}
                  alt={user.first_name + " profile"}
                  className="rounded-full w-10 h-10 object-cover"
                />
              </div>
              <div className="flex w-full justify-center flex-col">
                <h3 className="">{user.first_name}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="p-2 my-6 text-gray-600">
          You do not have any matches yet!
        </p>
      )}
    </>
  );
};

export default ListUsers;
