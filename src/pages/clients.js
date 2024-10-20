import useContentful from '../lib/useContentful';
import Loading from '../app/components/Loading';

const Clients = () => {
  const { clients, loadingClients } = useContentful();

  if (loadingClients) {
    return <Loading />; 
  }

  return (
    <div className='mainCon lg:px-20 px-10'>
      <h1  className='py-10 text-xl orpheusproMedium'>Clients</h1>
      <div className="clients-list lg:flex">
        {clients.map((client, idx) => (
          <div key={idx} className="client-card">
            <img
              src={client.image}
              alt={`${client.name} logo`}
              className="client-image"
            />
            <h2 className="client-name">{client.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
