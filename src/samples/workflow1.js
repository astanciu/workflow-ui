const workflow1 = {
  name: 'Sample Workflow 1',
  nodes: [
    { name: 'Plus', id: '1', icon: 'plus-circle', position: { x: 3, y: 7 } },
    {
      name: 'User',
      id: '2',
      icon: 'user',
      position: { x: 254, y: 130 },
    },
    { name: 'Home', id: '3', icon: 'home', position: { x: -137, y: -32 } },
    { name: 'Jedi', id: '4', icon: 'jedi', position: { x: 254, y: -105 } },
    // { id: '5', icon: 'network-wired', position: { x: -65, y: 105 } }
  ],
  connections: [{ from: '1', to: '2', id: 'h1zt2' }],
};

export default workflow1;
