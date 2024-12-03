export default function PresupuestosDeVentas() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '50px',
      }}
    >
      <div>esto es el presupuesto de ventas</div>
      <h1>{window.location.href}</h1>
    </div>
  );
}
