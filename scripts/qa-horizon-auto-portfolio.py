"""Compatibility entry point. The five-project matrix supersedes the first Auto-only check.
Accepts the same --base/--engine/--output options plus --interactions.
"""
import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).with_name('qa-portfolio-devices.py')), run_name='__main__')
