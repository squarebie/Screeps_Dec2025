# GOAP (Goal-Oriented Action Planning) System

This document outlines our implementation of GOAP for creep AI.

## Core Concepts

GOAP is an AI architecture where agents (our creeps) decide what to do next by finding a sequence of actions that will satisfy a predetermined goal. This is in contrast to more rigid systems like Finite State Machines (FSMs).

Our system consists of three main components:
1.  **Goals**: The desired state of the world a creep wants to achieve (e.g., "energy is stored").
2.  **Actions**: The individual tasks a creep can perform (e.g., "harvest energy," "move to spawn"). Each action has preconditions (what must be true to perform it) and effects (how it changes the world state).
3.  **Planner**: The "brain" of the system. It looks at the current world state, the desired goal state, and the available actions, and finds a sequence of actions (a "plan") to get from the current state to the goal state.

## Implementation Files

*   `GOALS_Library.js`: Contains a library of all possible goals our creeps can have. Each goal has a priority and a desired state.
*   `ACTIONS_Library.js`: Contains a library of all possible actions our creeps can perform. Each action defines its cost, preconditions, effects, and a `perform` function that executes the action's logic.
*   `GOAP_Planner.js`: Takes a creep and a set of goals, and finds a plan (a sequence of actions) to achieve the highest-priority goal.
*   `CREEP_Manager.js`: The main loop for our creeps. On each tick, it gets a plan from the planner and executes the next action in that plan.
