import Link from "next/link";

function ClaimsGrid({ claims }) {
  // If claims is not loaded yet, render a loading message
  if (!claims) {
    return <p>Loading...</p>;
  }

  // Now it's safe to map over the claims
  return (
    <div>
      {claims.map((claim) => (
        <div key={claim.id}>
          <Link href={`/claims/${claim.id}`}>
            <img src={claim.image} alt={claim.title} />
          </Link>
          <Link href={`/claims/${claim.id}`}>
            {claim.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ClaimsGrid;
