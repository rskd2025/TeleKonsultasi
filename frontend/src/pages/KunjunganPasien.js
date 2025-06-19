<Container fluid className="mt-4 mb-4" style={{ fontSize: '0.9rem' }}>
  <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
    <h5 className="text-white px-3 py-2 rounded" style={{ backgroundColor: '#884EA0' }}>
      📝 Kunjungan Pasien Hari Ini
    </h5>
    <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
      ⬅ Kembali
    </Button>
  </div>

  <Form className="mb-3">
    <Row>
      <Col xs={12} md={6}>
        <Form.Control
          type="text"
          placeholder="Cari nama pasien..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="sm"
        />
      </Col>
    </Row>
  </Form>

  {loading ? (
    <div className="text-center">
      <Spinner animation="border" size="sm" />
    </div>
  ) : (
    filteredData.map((item) => (
      <Card key={item.id} className="mb-3 shadow-sm">
        <Card.Body
          style={{
            fontSize: '0.85rem',
            overflowX: 'auto',
            minWidth: '280px',
          }}
        >
          <Card.Title className="fw-bold">
            {item.nama_lengkap.toUpperCase()} - {item.jenis_kelamin}, {item.umur} th
          </Card.Title>
          <Card.Text>
            <strong>Faskes Asal:</strong> {item.faskes_asal} <br />
            <strong>Tujuan Konsul:</strong> {item.tujuan_konsul} <br />
            <strong>Tanggal:</strong> {item.tanggal} <br />
            <strong>Status:</strong>{' '}
            <Badge bg="success">Pasien berada di ruangan / Sedang dilayani</Badge>
          </Card.Text>
          <div className="d-flex gap-2 flex-wrap">
            <Button variant="success" size="sm" onClick={() => handleTerima(item)}>
              Terima
            </Button>
            <Button variant="danger" size="sm" onClick={() => handleBatal(item)}>
              Batal
            </Button>
          </div>
        </Card.Body>
      </Card>
    ))
  )}

  <Modal show={showModal} onHide={() => setShowModal(false)} centered>
    <Modal.Header closeButton>
      <Modal.Title>Form Jawaban Konsul</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {selectedPasien && (
        <>
          <p><strong>Nama:</strong> {selectedPasien.nama_lengkap}</p>
          <p><strong>Umur:</strong> {selectedPasien.umur}</p>
          <p><strong>Diagnosa:</strong> {selectedPasien.diagnosa}</p>
          <p><strong>Anamnesis:</strong> {selectedPasien.anamnesis}</p>
          <Form.Group className="mt-3">
            <Form.Label>Jawaban Konsul</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={jawabanKonsul}
              onChange={(e) => setJawabanKonsul(e.target.value)}
            />
          </Form.Group>
        </>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Batal
      </Button>
      <Button variant="primary" onClick={simpanKonsul}>
        Simpan
      </Button>
    </Modal.Footer>
  </Modal>
</Container>
