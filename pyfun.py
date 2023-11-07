class Masina:
    def __init__(self, marca, model, culoare):
        self.marca = marca
        self.model = model
        self.culoare = culoare

    def afiseaza(self):
        print("Marca: ", self.marca)
        print("Model: ", self.model)
        print("Culoare: ", self.culoare)


class MasinaSport(Masina):
    def __init__(self, marca, model, culoare, viteza_maxima):
        super().__init__(marca, model, culoare)
        self.viteza_maxima = viteza_maxima

    def afiseaza(self):
        super().afiseaza()
        print("Viteza maxima: ", self.viteza_maxima)


# masina1 = Masina("BMW", "M5", "alb")
# masina1.afiseaza()


class Pisica:
    def __init__(self, nume, varsta):
        self.nume = nume
        self.varsta = varsta
        self.__culoare = "alb"

    def afiseaza(self):
        print("Nume: ", self.nume)
        print("Varsta: ", self.varsta)
        print("Culoare: ", self.__culoare)


pisica1 = Pisica("Tom", 2)
pisica1.afiseaza()
