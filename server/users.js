const room_map = new Map();

function addUser({ name, room, id }) {
	if (!room_map.has(room)) room_map.set(room, [{ id, name, room }]);
	else if (room_map.get(room).find(item => item.name == name)) return false;
	else room_map.get(room).push({ id, name, room });

	return true;
}

function removeUser({ name, room }) {
	let index = null;
	room_map
		.get(room)
		.forEach((item, i) => (item.name == name ? (index = i) : null));
	room_map.get(room).splice(index, 1);
}

module.exports = { room_map, addUser, removeUser };
