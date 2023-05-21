import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>The page you&apos;re trying to view doesn&apos;t exist</h2>
      <p>
        Go back to the{' '}
        <button onClick={() => navigate(-1)}>previous page</button>
      </p>
    </div>
  );
}
