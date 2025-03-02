import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sales/documents')({
  component: SalesDocuments,
});

function SalesDocuments() {
  return <h3>this is the sales table</h3>;
}
