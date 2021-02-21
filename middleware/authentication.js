export default function(context) {
  // Universal keys
  const { redirect } = context;
  // Server-side
  // Client-side
  if (process.client) {
    if (!window.localStorage.getItem('token')) {
      return redirect('/login');
    }
  }
}
