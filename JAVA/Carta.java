package JAVA;

public class Carta {
    private String naipe;
    private int valor;
    private char simbolo;

    // Método Construtor
    public Carta(String naipe, int valor, char simbolo) {
        this.naipe = naipe;
        this.valor = valor;
        this.simbolo = simbolo;
    }

    public String getNaipe() {
        return naipe;
    }

    public void setNaipe(String naipe) {
        this.naipe = naipe;
    }
}