import numpy as np


# Fungsi aktivasi sigmoid
def sigmoid(x):
    return 1 / (1 + np.exp(-x))


# Derivatif fungsi aktivasi sigmoid
def sigmoid_derivative(x):
    return x * (1 - x)


# Kelas NeuralNetwork
class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        # Inisialisasi bobot secara acak
        self.weights1 = np.random.randn(input_size, hidden_size)
        self.weights2 = np.random.randn(hidden_size, output_size)

    def forward(self, X):
        # Propagasi maju
        self.hidden = sigmoid(np.dot(X, self.weights1))
        self.output = sigmoid(np.dot(self.hidden, self.weights2))

    def backward(self, X, y, learning_rate):
        # Propagasi mundur dan pembaruan bobot

        # Perhitungan gradien bobot output
        output_error = y - self.output
        output_delta = output_error * sigmoid_derivative(self.output)

        # Perhitungan gradien bobot hidden
        hidden_error = np.dot(output_delta, self.weights2.T)
        hidden_delta = hidden_error * sigmoid_derivative(self.hidden)

        # Pembaruan bobot
        self.weights2 += learning_rate * np.dot(self.hidden.T, output_delta)
        self.weights1 += learning_rate * np.dot(X.T, hidden_delta)

    def train(self, X, y, epochs, learning_rate):
        for epoch in range(epochs):
            # Propagasi maju dan mundur
            self.forward(X)
            self.backward(X, y, learning_rate)

    def predict(self, X):
        # Prediksi data
        self.forward(X)
        return self.output


# Contoh penggunaan model untuk prediksi data time series

# Data input
X = np.array([[0, 0, 1], [1, 1, 1], [1, 0, 1], [0, 1, 1]])

# Data output yang ingin diprediksi
y = np.array([[0, 1, 1, 0]]).T

# Inisialisasi model neural network
model = NeuralNetwork(input_size=3, hidden_size=36, output_size=1)

# Melatih model dengan data input dan output
model.train(X, y, epochs=10000, learning_rate=0.1)

# Menggunakan model untuk memprediksi data baru
new_data = np.array([[1, 1, 1]])
prediction = model.predict(new_data)
print("Prediksi:", prediction)
