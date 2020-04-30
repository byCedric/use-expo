import { renderHook, act } from '@testing-library/react-hooks';
import * as Application from 'expo-application';
import { useApplicationIosIdForVendor } from '../src';

const DATA = 0;
const GET = 1;

const vendorId = '68753A44-4D6F-1226-9C60-0050E4C00067';

it('returns data and get callback when mounted', () => {
	const hook = renderHook(() => useApplicationIosIdForVendor({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

describe('get callback', () => {
	it('updates data with get callback', async () => {
		jest.spyOn(Application, 'getIosIdForVendorAsync')
			.mockResolvedValue(vendorId);

		const hook = renderHook(() => useApplicationIosIdForVendor({ get: false }));
		expect(hook.result.current[DATA]).toBeUndefined();
		await act(() => hook.result.current[GET]());

		expect(hook.result.current[DATA]).toEqual(vendorId);
	});

	it('uses the same get callback when rerendered', async () => {
		const hook = renderHook(() => useApplicationIosIdForVendor({ get: false }));
		const getter = hook.result.current[GET];
		hook.rerender({ get: false });

		expect(getter).toBe(hook.result.current[GET]);
	});
});

describe('get option', () => {
	it('gets application vendor id when mounted', async () => {
		jest.spyOn(Application, 'getIosIdForVendorAsync')
			.mockResolvedValue(vendorId);

		const hook = renderHook(() => useApplicationIosIdForVendor({ get: true }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(vendorId);
	});

	it('updates data with get option when rerendered', async () => {
		jest.spyOn(Application, 'getIosIdForVendorAsync')
			.mockResolvedValue(vendorId);

		const hook = renderHook(useApplicationIosIdForVendor, { initialProps: { get: false } });
		expect(hook.result.current[DATA]).toBeUndefined();
		hook.rerender({ get: true })
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(vendorId);
	});
});
