import AuthContainer from '../components/AuthContainer';
import NotFoundMessage from '../components/NotFoundMessage';

export default function PublicNotFoundPage() {
  return (
    <AuthContainer>
      <div style={{ paddingTop: '150px', textAlign: 'center' }}>
        <NotFoundMessage textColor="#ffffff" linkColor="#f7941d" />
      </div>
    </AuthContainer>
  );
}
