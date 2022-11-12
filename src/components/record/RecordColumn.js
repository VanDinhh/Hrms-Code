import { parts } from '../../constant/data';

function getFullName(params) {
  return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
}

function getPartName(params) {
  const part = parts.filter((e) => e.id === params.row.partID);
  return part[0].name;
}

export const columns = [
  {
    field: 'stt',
    headerName: 'STT',
    width: 50,
    renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
  },
  {
    field: 'fullname',
    headerName: 'Full name',
    width: 160,
    valueGetter: getFullName,
  },
  {
    field: 'partName',
    headerName: 'Bộ phận',
    width: 160,
  },
  { field: 'address', headerName: 'Địa chỉ', width: 160 },
];
