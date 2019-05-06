export const workflow1 = {
  id: '1',
  name: 'Create User',
  description: 'Creates a user and completes all steps afterwards',
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
  created_by: 'google-oauth2|102699331906404881272',
  created_at: Date.now() - 5 * 24 * 60 * 60 * 1000,
  updated_by: 'google-oauth2|102699331906404881272',
  updated_at: Date.now() - 1 * 14 * 60 * 60 * 1000,
};

export const workflow2 = {
  id: '2',
  name: 'Rebuild Flow',
  description: 'Rebuilds the content system for testing',
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
  created_by: 'google-oauth2|102699331906404881272',
  created_at: Date.now() - 5000 * 24 * 60 * 60 * 1000,
  updated_by: 'google-oauth2|102699331906404881272',
  updated_at: Date.now() - 5 * 24 * 60 * 60 * 1000,
};

export const workflow3 = {
  id: '3',
  name: 'Check GitHub Notifications',
  description: 'Pull all notifications and do things',
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
  created_by: 'google-oauth2|102699331906404881272',
  created_at: Date.now(),
};
