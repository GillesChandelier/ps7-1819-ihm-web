# Tests fonctionnels 

## Sur la page /quiz :

Lorsque l'on arrive sur la page, on y voit affiché la première question du quiz.

Lorsque l'on clique sur une réponse : apparait alors l'affichage "carte réponse" ("Bonne/Mauvaise réponse" + la bonne réponse) à la place des réponses.

Lorsque l'on clique sur passer : on passe à l 'affichage de la question suivante 
S'il n'y a plus de question : on passe à affichage de la vue "quizz terminé" (vue avec simplement le texte 'Quizz terminé')


Lorsqu'est affiché la "carte réponse" : 
Lorsque l'on clique sur suivant : on passe à l'affichage de la question suivante.
S'il n'y a plus de question : on passe à l'affichage de la vue "quizz terminé"

## Sur la page /guide :

Lorsque l'on arrive sur la page, on y voit affiché tous les graphiques (des barres) avec tous les compteurs à 0.

Lorsqu'un membre du groupe va sur la page /quiz. => +1 au compteur taux de participation et la barre se met à jour.
Un membre du groupe répond à une question => mise à jour du taux de bonnes réponses, du taux de questions passées et les barres se mettent à jour. 
S'il répond bien|mal :
 - 0/1 taux de questions passées et 0 % pour la barre. 
 - 1/1 | 0/1 taux de bonnes réponses et 100% | 0% pour la barre.

Puis un membre du groupe passe une question => mise à jour du taux de bonnes réponses, du taux de questions passées et les barres se mettent à jour : 
- 1/2 taux de questions passées et 50% pour la barre
- 1/2 | 0/2 taux de bonne réponses et 50% | 0% pour la barre.

Un membre du groupe termine le quizz (il a la vue quizz terminé) => le taux de quizz terminés est mis à jour et la barre se met à jour.

Le dernier membre qui n'a pas terminé termine le quizz => le taux de quizz terminés est à 100%
et la moyenne des résultats par participant sur le nombre de questions s'affiche.

