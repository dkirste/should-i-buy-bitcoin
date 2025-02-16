# Should I Buy Bitcoin

Should I Buy Bitcoin is a fun and interactive website that provides users with technical analysis and recommendations on whether to buy Bitcoin. The project leverages various technical indicators and displays the results in an easy-to-understand format.

Note: This project is provided as-is and is not intended as financial advice.

## Project Structure

The project is divided into several components:

1. **Frontend (React)**
   - The frontend is built using React and Material Kit 2 React. It provides a user-friendly interface for displaying the analysis results.
   - Key files:
     - `src/App.js`: Main application file that sets up routes and themes.

2. **Backend (Python)**
   - The backend is responsible for fetching technical indicators from TradingView, processing them to generate buy/sell recommendations, and handling payment status checks via Stripe.
   - **Technicals**
     - This part of the backend fetches technical indicators and computes buy/sell signals.
     - Key files:
       - `python/technicals.py`: Contains the logic for computing various technical indicators.
       - `python/main.py`: Main script for fetching data and sending it to InfluxDB.
   - **Flask Backend**
     - This part of the backend handles API requests and payment status checks.
     - Key files:
       - `flask-backend/app.py`: Main Flask application file.
       - `flask-backend/stribe_lib.py`: Utility functions for interacting with Stripe API.
       - `flask-backend/influx_lib.py`: Utility functions for interacting with InfluxDB.


3. **Database (InfluxDB)**
   - InfluxDB is used to store the technical indicators and their computed signals.
   - The database is set up using Docker Compose.

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.x
- Docker and Docker Compose

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/should-i-buy-bitcoin.git
   cd should-i-buy-bitcoin
   ```

2. **Install frontend dependencies:**
   ```sh
   cd sibb-react
   npm install
   ```

3. **Set up the backend:**
   - Create a virtual environment and install dependencies:
     ```sh
     cd ../python
     python -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     ```

4. **Set up Docker containers:**
   ```sh
   cd ../docker
   docker-compose up -d
   ```

### Running the Project

1. **Start the frontend:**
   ```sh
   cd sibb-react
   npm start
   ```

2. **Start the backend:**
   ```sh
   cd ../python
   source venv/bin/activate
   python main.py
   ```

### Usage

- Visit `http://localhost:3000` to access the frontend.
- The backend will continuously fetch and process technical indicators, storing the results in InfluxDB.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.

You are free to share, and adapt this work, but you may not use it for commercial purposes. Please give appropriate credit and indicate if changes were made. For more details, see the full license.

## Acknowledgements

- [Material Kit 2 React](https://www.creative-tim.com/product/material-kit-react)
- [TradingView Technical Analysis](https://github.com/deathlyface/tradingview-ta)
- [InfluxDB](https://www.influxdata.com/)
- [Grafana](https://grafana.com/)