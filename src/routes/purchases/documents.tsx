export default function Comprobantes() {
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
      <div>esto es el remito de ventas</div>
      <h1>{window.location.href}</h1>
    </div>
  );
}
