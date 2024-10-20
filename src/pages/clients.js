import useContentful from '../lib/useContentful';
import Loading from '../app/components/Loading';
import Image from 'next/image';

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
            <Image
              src={client.image}
              alt={`${client.name} logo`}
              width={400} 
              height={300}
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
