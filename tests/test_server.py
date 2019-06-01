import unittest
import server

class TestData(unittest.TestCase):
    def test_data(self):
        self.assertNotEqual(str(server.server.data['str']), '')
        self.assertNotEqual(str(server.server.data['str']), 'NaN')
        self.assertNotEqual(str(server.server.data['str']), '{}')

if __name__ == '__main__':
    unittest.main()
