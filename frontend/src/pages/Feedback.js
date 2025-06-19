// ... (import tetap sama)

const Feedback = ({ userRole = 'admin' }) => {
  // ... (state dan useEffect tetap sama)

  return (
    <Container fluid className="mt-4 mb-5">
      <h5 className="mb-3 text-center fw-bold">📋 Feedback Konsul Pasien</h5>

      <Row className="mb-3 g-2 align-items-center">
        <Col xs={12} md={4}>
          <Form.Control
            type="text"
            placeholder="Cari nama pasien..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="sm"
          />
        </Col>
        <Col xs={12} md={4}>
          <Form.Control
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            size="sm"
          />
        </Col>
        <Col xs={12} md={4}>
          <div className="d-flex flex-wrap gap-2">
            <Button size="sm" variant="success" onClick={exportToExcel}>Excel</Button>
            <Button size="sm" variant="primary" onClick={exportToWord}>Word</Button>
            <Button size="sm" variant="danger" onClick={exportToPDF}>PDF</Button>
            <Button size="sm" variant="warning" onClick={exportToImage}>JPG</Button>
          </div>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" size="sm" />
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <Table striped bordered hover size="sm" id="feedback-table" className="text-nowrap" style={{ fontSize: '0.85rem', minWidth: '900px' }}>
            <thead className="text-center">
              <tr>
                <th>Nama</th>
                <th>Umur</th>
                <th>Faskes Asal</th>
                <th>Tujuan Konsul</th>
                <th>Tanggal</th>
                <th>Diagnosa</th>
                <th>Anamnesis</th>
                <th>Jawaban Konsul</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.nama_lengkap}</td>
                  <td>{item.umur}</td>
                  <td>{item.faskes_asal}</td>
                  <td>{item.tujuan_konsul}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.diagnosa}</td>
                  <td>{item.anamnesis}</td>
                  <td>{item.jawaban_konsul || '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Feedback;
