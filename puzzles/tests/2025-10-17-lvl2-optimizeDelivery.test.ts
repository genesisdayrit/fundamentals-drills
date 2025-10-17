import { describe, it, expect } from 'vitest';
import { optimizeDeliveryRoute } from '../problems/2025-10-17-lvl2-optimizeDelivery';

describe('optimizeDeliveryRoute', () => {
  it('handles empty package list', () => {
    expect(optimizeDeliveryRoute([])).toEqual({
      success: true,
      route: [],
      totalDistance: 0,
      undeliverable: [],
    });
  });

  it('handles a single valid package', () => {
    const packages = [
      { id: 'A', pickup: 5, delivery: 10 },
    ];
    expect(optimizeDeliveryRoute(packages)).toEqual({
      success: true,
      route: [
        { position: 5, type: 'pickup', packageId: 'A' },
        { position: 10, type: 'delivery', packageId: 'A' },
      ],
      totalDistance: 10,
      undeliverable: [],
    });
  });

  // it('handles a package with delivery before pickup', () => {
  //   const packages = [
  //     { id: 'A', pickup: 10, delivery: 5 },
  //   ];
  //   expect(optimizeDeliveryRoute(packages)).toEqual({
  //     success: false,
  //     route: [],
  //     totalDistance: 0,
  //     undeliverable: ['A'],
  //   });
  // });

  // it('handles multiple valid packages in order', () => {
  //   const packages = [
  //     { id: 'A', pickup: 5, delivery: 10 },
  //     { id: 'B', pickup: 3, delivery: 8 },
  //   ];
  //   expect(optimizeDeliveryRoute(packages)).toEqual({
  //     success: true,
  //     route: [
  //       { position: 3, type: 'pickup', packageId: 'B' },
  //       { position: 5, type: 'pickup', packageId: 'A' },
  //       { position: 8, type: 'delivery', packageId: 'B' },
  //       { position: 10, type: 'delivery', packageId: 'A' },
  //     ],
  //     totalDistance: 10,
  //     undeliverable: [],
  //   });
  // });

  // it('handles overlapping pickup and delivery points', () => {
  //   const packages = [
  //     { id: 'A', pickup: 5, delivery: 15 },
  //     { id: 'B', pickup: 10, delivery: 15 },
  //   ];
  //   expect(optimizeDeliveryRoute(packages)).toEqual({
  //     success: true,
  //     route: [
  //       { position: 5, type: 'pickup', packageId: 'A' },
  //       { position: 10, type: 'pickup', packageId: 'B' },
  //       { position: 15, type: 'delivery', packageId: 'A' },
  //       { position: 15, type: 'delivery', packageId: 'B' },
  //     ],
  //     totalDistance: 15,
  //     undeliverable: [],
  //   });
  // });

  // it('identifies some undeliverable packages among valid ones', () => {
  //   const packages = [
  //     { id: 'A', pickup: 5, delivery: 10 },
  //     { id: 'B', pickup: 20, delivery: 15 },
  //     { id: 'C', pickup: 7, delivery: 12 },
  //   ];
  //   expect(optimizeDeliveryRoute(packages)).toEqual({
  //     success: false,
  //     route: [],
  //     totalDistance: 0,
  //     undeliverable: ['B'],
  //   });
  // });

  // it('handles packages that start and end at same position', () => {
  //   const packages = [
  //     { id: 'A', pickup: 5, delivery: 5 },
  //   ];
  //   expect(optimizeDeliveryRoute(packages)).toEqual({
  //     success: true,
  //     route: [
  //       { position: 5, type: 'pickup', packageId: 'A' },
  //       { position: 5, type: 'delivery', packageId: 'A' },
  //     ],
  //     totalDistance: 5,
  //     undeliverable: [],
  //   });
  // });

  // it('handles a realistic multi-package scenario', () => {
  //   const packages = [
  //     { id: 'Package1', pickup: 2, delivery: 8 },
  //     { id: 'Package2', pickup: 5, delivery: 12 },
  //     { id: 'Package3', pickup: 10, delivery: 15 },
  //   ];
  //   expect(optimizeDeliveryRoute(packages)).toEqual({
  //     success: true,
  //     route: [
  //       { position: 2, type: 'pickup', packageId: 'Package1' },
  //       { position: 5, type: 'pickup', packageId: 'Package2' },
  //       { position: 8, type: 'delivery', packageId: 'Package1' },
  //       { position: 10, type: 'pickup', packageId: 'Package3' },
  //       { position: 12, type: 'delivery', packageId: 'Package2' },
  //       { position: 15, type: 'delivery', packageId: 'Package3' },
  //     ],
  //     totalDistance: 15,
  //     undeliverable: [],
  //   });
  // });

  // it('handles packages starting from position 0', () => {
  //   const packages = [
  //     { id: 'A', pickup: 0, delivery: 10 },
  //     { id: 'B', pickup: 5, delivery: 15 },
  //   ];
  //   expect(optimizeDeliveryRoute(packages)).toEqual({
  //     success: true,
  //     route: [
  //       { position: 0, type: 'pickup', packageId: 'A' },
  //       { position: 5, type: 'pickup', packageId: 'B' },
  //       { position: 10, type: 'delivery', packageId: 'A' },
  //       { position: 15, type: 'delivery', packageId: 'B' },
  //     ],
  //     totalDistance: 15,
  //     undeliverable: [],
  //   });
  // });
});
