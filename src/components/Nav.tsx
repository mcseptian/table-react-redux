import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const breadcrumbNameMap = {
    '/': 'Home',
    '/example': 'Example'
  };
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={pathSnippets}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key={pathSnippets}>
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <Breadcrumb>{breadcrumbItems}</Breadcrumb>
  )
}
