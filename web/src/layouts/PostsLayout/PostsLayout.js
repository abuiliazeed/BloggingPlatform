import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const PostsLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="relative flex justify-between items-center py-4 px-8 bg-blue-700 text-white">
      <nav>
          <ul className="relative flex items-center font-light">
            <li>
              <Link className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded" to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded" to={routes.about()}>About</Link>
            </li>
            <li>
              <Link className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded" to={routes.contact()}>Contact</Link>
            </li>
          </ul>
        </nav>
        <h1 className="rw-heading rw-heading-primary">
          <Link  to={routes.posts()} className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded">
            Posts
          </Link>
        </h1>
        <Link to={routes.newPost()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Post
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default PostsLayout
