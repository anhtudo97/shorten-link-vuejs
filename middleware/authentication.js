export default function(context) {
  // Universal keys
  const {
    store,
    redirect,
  } = context;
  // Server-side
  // Client-side
  // if (process.client) {
  //   const { from, nuxtState } = context;
  //   if (!window.localStorage.getItem('token')) {
  //     return redirect('/login');
  //   }
  // }

  if (store.state.token === null) {
    return redirect('/login');
  }
}
