import { Helmet } from 'react-helmet-async';

const Favicon = () => {
  return (
    <Helmet>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
};

export default Favicon;
