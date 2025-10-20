import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from '../../components/common/DataTable';

const mockColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 200 },
];

const mockRows = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

describe('DataTable Component', () => {
  it('renders without crashing', () => {
    render(<DataTable columns={mockColumns} rows={mockRows} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    render(
      <DataTable columns={mockColumns} rows={mockRows} loading={true} />
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays data correctly', () => {
    render(<DataTable columns={mockColumns} rows={mockRows} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('handles row click', () => {
    const onRowClick = jest.fn();
    render(
      <DataTable
        columns={mockColumns}
        rows={mockRows}
        onRowClick={onRowClick}
      />
    );

    fireEvent.click(screen.getByText('John Doe'));
    expect(onRowClick).toHaveBeenCalled();
  });
});
