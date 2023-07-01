import numpy as np


def sigmoid(x):
    """Sigmoid activation function"""
    return 1 / (1 + np.exp(-x))


def sigmoid_derivative(x):
    """Derivative of the sigmoid function"""
    return sigmoid(x) * (1 - sigmoid(x))


class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        """Initialize the neural network with given sizes"""
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size

        # Initialize weights with random values
        self.weights1 = np.random.randn(hidden_size, input_size)
        self.weights2 = np.random.randn(output_size, hidden_size)

        # Initialize biases with zeros
        self.bias1 = np.zeros((hidden_size, 1))
        self.bias2 = np.zeros((output_size, 1))

    def forward_pass(self, X):
        """Perform forward pass through the network"""
        # Compute activations of the hidden layer
        self.hidden_activations = sigmoid(np.dot(self.weights1, X) + self.bias1)

        # Compute output predictions
        self.output_activations = sigmoid(
            np.dot(self.weights2, self.hidden_activations) + self.bias2
        )

    def backward_pass(self, X, y, learning_rate):
        """Perform backward pass and update weights"""
        m = X.shape[1]  # Number of training examples

        # Compute output error
        output_error = self.output_activations - y

        # Compute gradients of weights and biases
        grad_weights2 = np.dot(
            output_error * sigmoid_derivative(self.output_activations),
            self.hidden_activations.T,
        )
        grad_bias2 = np.sum(
            output_error * sigmoid_derivative(self.output_activations),
            axis=1,
            keepdims=True,
        )

        # Compute hidden layer error
        hidden_error = np.dot(self.weights2.T, output_error) * sigmoid_derivative(
            self.hidden_activations
        )

        # Compute gradients of weights and biases
        grad_weights1 = np.dot(hidden_error, X.T)
        grad_bias1 = np.sum(hidden_error, axis=1, keepdims=True)

        # Update weights and biases
        self.weights2 -= learning_rate * grad_weights2
        self.bias2 -= learning_rate * grad_bias2
        self.weights1 -= learning_rate * grad_weights1
        self.bias1 -= learning_rate * grad_bias1

    def train(self, X, y, epochs, learning_rate):
        """Train the neural network"""
        for epoch in range(epochs):
            self.forward_pass(X)
            self.backward_pass(X, y, learning_rate)

            # Print the loss for every 100 epochs
            if epoch % 100 == 0:
                loss = np.mean((self.output_activations - y) ** 2)
                print(f"Epoch {epoch}: Loss = {loss}")

    def predict(self, X):
        """Make predictions on new data"""
        self.forward_pass(X)
        return self.output_activations


# Example usage
X_train = np.array([[0, 0], [0, 1], [1, 0], [1, 1]]).T
y_train = np.array([[0, 1, 1, 0]])

# Create a neural network with 2 input units, 4 hidden units, and 1 output unit
model = NeuralNetwork(input_size=2, hidden_size=4, output_size=1)

# Train the model
model.train(X_train, y_train, epochs=10000, learning_rate=0.1)

# Make predictions
X_test = np.array([[0, 0], [0, 1], [1, 0], [1, 1]]).T
predictions = model.predict(X_test)

print("Predictions:", predictions)
